// app/api/upload/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../lib/firebase'; // adjust path if lib is in root (../../../lib/firebase) or app (../lib/firebase)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;  // "images" or "files"

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `items/${category}/${fileName}`);

    // Upload from server (no CORS issue)
    await uploadBytes(storageRef, await file.arrayBuffer(), { contentType: file.type });

    const url = await getDownloadURL(storageRef);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Server upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

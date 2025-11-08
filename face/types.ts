
export interface Teacher {
  id: string;
  name: string;
  imageUrl: string;
  faceDescriptor: number[];
}

export interface LabeledFaceDescriptors {
  label: string;
  descriptors: Float32Array[];
}

export interface AttendanceRecord {
  id: string;
  name: string;
  time: string;
  status: 'Present' | 'Absent';
}

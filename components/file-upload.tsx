'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

interface FileUploadProps {
	onChange: (url?: string) => void;
	endpoint: 'messageFile' | 'serverImage';
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].ufsUrl);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		/>
	);
};

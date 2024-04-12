import React from "react";

import FormContainer from "@/components/auth/FormContainer";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Authorization = () => {
	return (
		<div className={inter.className} style={{ margin: 0, padding: 0 }}>
			<FormContainer />
		</div>
	);
};

export default Authorization;

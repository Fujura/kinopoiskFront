import Profile from "@/components/profile/Profile";
import store from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const profile = () => {
	return (
		<div className={inter.className} style={{ margin: 0, padding: 0 }}>
			<Provider store={store}>
				<Profile />
			</Provider>
		</div>
	);
};

export default profile;

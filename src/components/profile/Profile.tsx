import { fetchMe } from "@/store/fetchMeSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "@/styles/profile/profile.module.css";
import Image from "next/image";
import { UploadAvatar } from "./UploadAvatar";
import NavBar from "../navbar/NavBar";

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

const Profile = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const userData = useSelector((state: any) => state.todos.data);
	const [fetchUpdate, setFetchUpdate] = useState<boolean>(false);
	useEffect(() => {
		dispatch(fetchMe());
	}, []);
	console.log(API_LINK + userData.avatarUrl);
	console.log(userData);
	const date = new Date(userData.createdAt);

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	const formattedDate = date.toLocaleDateString("en-US", options);
	return (
		<div className={styles.profileContainer}>
			<NavBar />
			<Image
				src="/glassBg.avif"
				layout="fill"
				style={{ zIndex: -1, filter: "blur(50px)" }}
				alt="glass background"
			/>
			<div className={styles.userContainer}>
				<div className={styles.userInfo}>
					<Image
						src={
							userData.avatarUrl
								? `${API_LINK}${userData.avatarUrl}`
								: "/profileDefault.png"
						}
						width={128}
						height={128}
						alt="profile icon"
					/>

					<UploadAvatar
						userId={userData.id}
						username={userData.username}
						avatarUrl={userData.avatarUrl}
						update={[fetchUpdate, setFetchUpdate]}
					/>
					<h4 className={styles.username}>{userData.username}</h4>
				</div>
				<div className={styles.userMoreInfo}>
					<p>
						Комментариев на этом сайте:{" "}
						{userData.comments ? userData.comments.length : ""}
					</p>
					<p>Дата регистрации аккаунта: {formattedDate}</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;

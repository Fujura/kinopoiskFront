import React, { FC } from "react";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/CommentItem/CommentItem.module.css";
import Image from "next/image";

interface CommentItemProps {
	commentData: {
		text: string;
		createdAt: string;
		user: {
			data: {
				attributes: {
					username: string;
				};
			};
		};
	};
}

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

const CommentItem: FC<CommentItemProps> = ({ commentData }) => {
	const { text, createdAt, user } = commentData;
	const { username } = user.data.attributes;

	const date = new Date(createdAt);
	const formattedDate = new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(date);

	return (
		<li className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					src={"/profileDefault.png"}
					width={64}
					height={64}
					alt="smtg"
					quality={100}
				/>
			</div>
			<div className={styles.infoContainer}>
				<div className={styles.topPart}>
					<h4 className={styles.itemTitle}>{username}</h4>
					<p className={styles.date}>{formattedDate}</p>
				</div>
				<p>{text}</p>
			</div>
		</li>
	);
};

export default CommentItem;

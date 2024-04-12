import React, { FC } from "react";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/CommentItem/CommentItem.module.css";
interface commentProps {
	commentData: any;
}
const CommentItem: FC<commentProps> = ({ commentData }) => {
	const { text, createdAt } = commentData;
	const userData = commentData?.user?.data?.attributes;
	console.log(userData);
	const date = new Date(createdAt);

	const monthNames = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	const hours = date.getHours();
	let minutes: string | any = date.getMinutes();
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	const formattedDate = `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}`;
	return (
		<li className={styles.container}>
			<h4 className={styles.itemTitle}>{userData.username}</h4>
			{commentData.text} {formattedDate}
		</li>
	);
};

export default CommentItem;

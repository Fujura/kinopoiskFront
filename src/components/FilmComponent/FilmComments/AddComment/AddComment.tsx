// CommentForm.tsx
import React, { FC, FormEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/CommentsContainer/CommentsContainer.module.css";

interface CommentFormProps {
	filmData: any;
	updateComments: any;
}

const AddComment: FC<CommentFormProps> = ({ filmData, updateComments }) => {
	const userData = useSelector((state: any) => state.todos.data);
	const [inputText, setInputText] = useState<string>("");
	const [cookie] = useCookies(["jwt"]);

	const postCommentHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			if (inputText && filmData) {
				try {
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_LINK}/api/comments`,
						{
							data: {
								film: filmData,
								text: inputText,
								user: userData,
							},
						},
						{
							headers: { Authorization: `Bearer ${cookie.jwt}` },
						}
					);
					console.log(response);
				} catch (error) {
					console.log(error);
				}
				setInputText("");
				updateComments[0](!updateComments[1]);
			}
		},
		[inputText, filmData, userData, cookie.jwt]
	);

	return (
		<form onSubmit={postCommentHandler} className={styles.inputContainer}>
			<label htmlFor="addComent" className={styles.inputTitle}>
				Добавьте свой комментарий!
			</label>
			<input
				type="text"
				id="addComent"
				value={inputText}
				className={styles.inputElevated}
				onChange={(e) => setInputText(e.target.value)}
			/>
			<button type="submit" className={styles.formBtn}>
				Отправить
			</button>
		</form>
	);
};

export default AddComment;

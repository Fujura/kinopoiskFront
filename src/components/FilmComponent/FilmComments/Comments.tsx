import { fetchMe } from "@/store/fetchMeSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CommentItem from "./CommentItem/CommentItem";
import { DottedLoader } from "@/components/Loaders/DottedLoader";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/CommentsContainer/CommentsContainer.module.css";

interface propsData {
	data: any;
}

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;
const Comments: FC<propsData> = ({ data }) => {
	const userData = useSelector((state: any) => state.todos.data);
	const [hasFilmDB, setFilmDB] = useState<boolean>();
	const [inputText, setInputText] = useState<string>("");
	const [filmData, setFilmData] = useState<any>();
	const [cookie, setCookie] = useCookies(["jwt"]);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const postFilm = async () => {
		try {
			const request = await axios.post(`${API_LINK}/api/films`, {
				data: {
					imdbID: data.imdbID,
					filmTitle: data.Title,
					year: data.Year,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		dispatch(fetchMe());
		if (data.imdbID) {
			(async () => {
				try {
					const response = await axios.get(
						`${API_LINK}/api/films?populate=deep,3&filters[imdbID][$eq]=${data.imdbID}`
					);
					if (!!response.data.data.length) {
						setFilmDB(true);
						setFilmData(response.data.data[0]);
					} else {
						postFilm();
						setFilmDB(false);
					}
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [hasFilmDB]);

	console.log(filmData);

	const postCommentHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (inputText) {
			try {
				const response = await axios.post(
					`${API_LINK}/api/comments`,
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
		}
	};

	return (
		<section>
			<input
				type="text"
				value={inputText}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInputText(e.target.value)
				}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.keyCode === 13) {
						postCommentHandler(e);
					}
				}}
			/>
			<ul>
				{hasFilmDB ? (
					filmData &&
					filmData.attributes &&
					filmData.attributes.comments.data.map((comment: any) => (
						<CommentItem key={comment.id} commentData={comment.attributes} />
					))
				) : (
					<div className={styles.loadingContainer}>
						<DottedLoader />
						<p>загрузка комментариев</p>
					</div>
				)}
			</ul>
		</section>
	);
};

export default Comments;

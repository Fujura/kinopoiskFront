// Comments.tsx
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CommentItem from "./CommentItem/CommentItem";
import { DottedLoader } from "@/components/Loaders/DottedLoader";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/CommentsContainer/CommentsContainer.module.css";
import AddComment from "./AddComment/AddComment";
import { fetchMe } from "@/store/fetchMeSlice";

interface CommentsProps {
	data: any;
}

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

const Comments: FC<CommentsProps> = ({ data }) => {
	const [filmData, setFilmData] = useState<any>();
	const [hasFilmDB, setFilmDB] = useState<boolean>();
	const [updateComments, setUpdateComments] = useState<boolean>(false);
	const [isAuth, setIsAuth] = useState<boolean>();
	const [cookie] = useCookies(["jwt"]);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	useEffect(() => {
		dispatch(fetchMe());
		if (cookie.jwt) setIsAuth(true);
		else setIsAuth(false);
	}, []);

	useEffect(() => {
		if (data.imdbID) {
			(async () => {
				try {
					const response = await axios.get(
						`${API_LINK}/api/films?populate=deep,3&filters[imdbID][$eq]=${data.imdbID}`
					);
					if (!!response.data.data.length) {
						setFilmData(response.data.data[0]);
						setFilmDB(true);
					} else {
						setFilmDB(false);
						postFilm();
					}
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [updateComments, hasFilmDB]);

	const postFilm = async () => {
		try {
			await axios.post(`${API_LINK}/api/films`, {
				data: {
					imdbID: data.imdbID,
					filmTitle: data.Title,
					year: data.Year,
					plot: data.Plot,
					runTime: data.Runtime,
					genre: data.Genre,
					rating: data.imdbRating,
					imageUrl: data.Poster,
				},
			});
			setFilmDB(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section style={{ marginTop: "100px" }}>
			{isAuth ? (
				<AddComment
					filmData={filmData}
					updateComments={[setUpdateComments, updateComments]}
				/>
			) : (
				<h3 style={{ textAlign: "center" }}>
					Авторизуйтесь, чтобы оставлять комментарии!
				</h3>
			)}
			{hasFilmDB ? (
				<ul style={{ padding: 0 }}>
					{!!filmData?.attributes?.comments?.data?.length ? (
						filmData &&
						filmData.attributes &&
						filmData.attributes.comments.data.map((comment: any) => (
							<CommentItem key={comment.id} commentData={comment.attributes} />
						))
					) : (
						<p style={{ textAlign: "center", marginTop: "40px" }}>
							Будь первым, кто оставил здесь комментарий!
						</p>
					)}
				</ul>
			) : (
				<div className={styles.loadingContainer}>
					<DottedLoader />
					<p>загрузка комментариев</p>
				</div>
			)}
		</section>
	);
};

export default Comments;

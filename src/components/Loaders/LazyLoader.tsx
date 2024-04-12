import { FC } from "react";
import styles from "@/styles/Loader/loader1.module.css";
export const LazyLoader: FC = () => {
	return (
		<div className={styles.lds}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

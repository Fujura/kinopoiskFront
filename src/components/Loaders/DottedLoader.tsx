import { FC } from "react";
import styles from "@/styles/Loader/dottedLoader.module.css";
export const DottedLoader: FC = () => {
	return (
		<div>
			<div className={styles.ldsellipsis}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

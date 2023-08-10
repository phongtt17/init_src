import InputForward from "@/components/Input";
import { Fragment } from "react";

const SearchHeader = (): JSX.Element => {
	return (
		<Fragment>
			<form className="form-inline search-form">
				<div className="form-group mb-0">
					<InputForward
						className={"form-control-plaintext"}
						type="search"
						placeholder="Search.."
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default SearchHeader;

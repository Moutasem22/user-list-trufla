import UserItem from '../userItem/userItem';

const UsersList = () => {
	return (
		<div>
			<div className="user__wrapper">
				<h1>Users</h1>
				<div className="user__wrapper--items">
					<UserItem />
				</div>
			</div>
		</div>
	);
};

export default UsersList;

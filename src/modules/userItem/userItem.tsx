import { useEffect, useState } from 'react';
import UsersListData from '../../data/usersList/users.json';
import InterestsListData from '../../data//interestsList/interests.json';
import { DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const UserCard = () => {
	const [isCollapse, setIsCollapse] = useState(0 as any);
	const [userList, setUsersList] = useState([] as any);
	const [userInterest, setUsersInterest] = useState([] as any);

	const getUserList = () => {
		let userSorting: any = UsersListData.sort((front, back) => front.following.length - back.following.length);
		setUsersList(userSorting);
		setUsersInterest(InterestsListData);
	};

	useEffect(() => {
		getUserList();
	}, []);

	const deleteUser = (selectedUser: any, interest: boolean) => {
		let remainigUsers = [] as any;
		if (!interest) {
			remainigUsers = userList.filter((item: any) => item.id !== selectedUser.id);
		} else {
			let remainingInter = selectedUser.interests.filter((inter: any) => inter !== interest);
			remainigUsers = userList.map((userItem: any) => {
				if (userItem.id === selectedUser.id) {
					return { ...userItem, interests: remainingInter };
				} else return userItem;
			});
		}
		setUsersList(remainigUsers);
	};

	return (
		userList.length > 0 &&
		userList.map((user: any, i: number) => {
			return (
				<div className="user__card" key={i}>
					<span className="user__index">
						Following {user.following.length}{' '}
						<span
							style={{ cursor: 'pointer' }}
							onClick={() => {
								setIsCollapse(isCollapse === i ? null : i);
							}}
						>
							<i>{isCollapse === i ? <UpOutlined /> : <DownOutlined />}</i>
						</span>
					</span>
					<div className="user__card--data">
						<h2>
							{user.name}{' '}
							<span>
								<DeleteOutlined
									onClick={() => {
										deleteUser(user, false);
									}}
									style={{ color: 'red' }}
								/>
							</span>
						</h2>
						{isCollapse === i ? (
							<div className="user__card--info">
								<div className="user__info--interest">
									{user.interests && user.interests.length > 0 ? (
										<>
											<p>Interests: </p>
											<ul>
												{user.interests.map((userInter: any) => {
													return userInterest.map((inter: any, idx: number) => {
														return (
															userInter === inter.id && (
																<li key={idx}>
																	{inter.name}{' '}
																	<DeleteOutlined
																		onClick={() => {
																			deleteUser(user, inter.id);
																		}}
																		style={{ color: 'red' }}
																	/>
																</li>
															)
														);
													});
												})}
											</ul>
										</>
									) : (
										<p>There is no interests</p>
									)}
								</div>
							</div>
						) : null}
					</div>
				</div>
			);
		})
	);
};

export default UserCard;

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { superCategories } from '../../utils/superCategories'
import formatQuery from '../../utils/formatQuery'
import styled from 'styled-components'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'

export default function CategoryMenu({ menuOpen, closeMenu, onSearch }) {
	const currentUser = useSelector((state) => state.user.currentUser) 
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
	useEffect(() => {
		// Prevent scroll when menu is open
		document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [menuOpen])

	// Department component to handle each category section
	const Department = ({ category }) => (
		<DepartmentWrapper>
			<h3>{category.title}</h3>
			<ul>
				{category.subCategories.map((subCategory, i) => (
					<li key={i} onClick={() => onSearch(subCategory)}>
						<div>
							<p>{formatQuery(subCategory)}</p>
							<ChevronIcon direction="right" />
						</div>
					</li>
				))}
			</ul>
		</DepartmentWrapper>
	)

	return (
		<>
			<ModalBackground $menuOpen={menuOpen} onClick={closeMenu} />
			<ModalContainer $menuOpen={menuOpen}>
				<ModalHeader>
					<div className="profile">
						<ProfileIcon />
						<p>Hello{currentUser && isLoggedIn ? ` ${currentUser.first_name}!` : '...'}</p>
					</div>
					<button onClick={closeMenu}>
						<CloseIcon />
					</button>
				</ModalHeader>
				<Heading>
					<h2>Shop by Department</h2>
				</Heading>
				{superCategories.map((category, index) => (
					<Department key={index} category={category} />
				))}
			</ModalContainer>
		</>
	)
}

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
	transition: var(--tr-medium);
`

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 40rem;
	background-color: var(--white);
	z-index: 99999;
	overflow-y: auto;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--md-blue);
	position: relative;
	div.profile {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		height: 3rem;
		svg {
			fill: var(--white);
		}
	}

	p {
		display: flex;
		align-items: center;
		min-width: fit-content;
		color: var(--white);
		font-size: var(--font-lg);
		font-weight: bold;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		position: absolute;
		right: var(--spacing-lg);
	}
`

const Heading = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--lt-blue);
	border-bottom: 1px solid var(--lt-grey-hover);
	h2 {
		font-size: clamp(var(--font-md), 2vw, var(--font-lg));
		font-weight: bold;
		color: var(--dk-blue);
	}
`

const DepartmentWrapper = styled.div`
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey-hover);
	h3 {
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
		font-weight: bold;
		color: var(--black);
	}
	ul {
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: var(--font-sm);
		cursor: pointer;
		div {
			width: 100%;
			padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
			display: flex;
			justify-content: space-between;
		}
		p {
			font-size: var(--font-sm);
			color: var(--dk-blue);
			padding: var(--spacing-sm) var(--spacing-md);
		}
		svg {
			path {
				stroke: var(--md-grey);
			}
		}
		&:hover {
			background-color: var(--cat-menu-hover);
			svg {
				path {
					stroke: var(--black);
				}
			}
		}
	}
	a {
		color: var(--black);
		text-decoration: none;
	}
`

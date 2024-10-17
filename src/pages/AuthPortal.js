import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { registerSchema, loginSchema } from '../schemas/index'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, loginUser } from '../redux/slices/userSlice'
import Logo from '../icons/Logo'
import ArrowheadIcon from '../icons/ArrowheadIcon'
import styled from 'styled-components'

export default function AuthPortal() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [showPasswordField, setShowPasswordField] = useState(false)
	const [isSignIn, setIsSignIn] = useState(true)

	const { loading, error } = useSelector((state) => state.user)

	const handleAuth = async (values) => {
		const { passwordConfirm, ...userData } = values;
		console.log('Register Payload:', userData);
		try {
			let result;
			if (isSignIn) {
				if (showPasswordField) {
					result = await dispatch(loginUser(userData));
					if (loginUser.fulfilled.match(result)) {
						navigate('/');
					}
				} else {
					setShowPasswordField(true); // First, show password field
				}
			} else {
				result = await dispatch(registerUser(userData));
				if (registerUser.fulfilled.match(result)) {
					setIsSignIn(true); // Switch to sign-in after successful registration
				}
			}
		} catch (err) {
			console.error('Authentication error:', err);
		}
	};

	const handleToggle = () => {
		formik.resetForm({  
			values: {
				fullname: '',
				email: '',
				password: '',
				passwordConfirm: '',
			},
		});
		setIsSignIn(!isSignIn);
	};
	
	const formik = useFormik({
		initialValues: {
			fullname: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
		validationSchema: isSignIn ? loginSchema : registerSchema,
		onSubmit: handleAuth,
		enableReinitialize: true,
	})

	const signIn = {
		heading: 'Sign-In',
		form: (
			<Form onSubmit={formik.handleSubmit}>
				{!showPasswordField ? (
					<div className="input-group">
						<label htmlFor="email">
							Email or mobile phone number
						</label>
						<input
							type="text"
							name="email"
							id="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email || ''}
							className={
								formik.touched.email && formik.errors.email
									? 'error'
									: ''
							}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className="error">{formik.errors.email}</div>
						)}
					</div>
				) : (
					<>
						<div>
							<p>{formik.values.email}</p>
							<button
								type="button"
								onClick={() => setShowPasswordField(false)}
							>
								Change
							</button>
						</div>
						<div className="input-group">
							<div className="label-and-button">
								<label htmlFor="password">Password</label>
								<button type="button">Forgot password?</button>
							</div>
							<input
								type="password"
								name="password"
								id="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password || ''}
								className={
									formik.touched.password &&
									formik.errors.password
										? 'error'
										: ''
								}
							/>
							{formik.touched.password &&
								formik.errors.password && (
									<div className="error">
										{formik.errors.password}
									</div>
								)}
						</div>
					</>
				)}
				<AuthButton
					type="submit"
					$text={showPasswordField ? 'Sign-In' : 'Continue'}
				>
					{showPasswordField ? 'Sign-In' : 'Continue'}
				</AuthButton>
			</Form>
		),
		legalese: (
			<div className="legalese">
				<p>
					By continuing, you agree to Scamazon's{' '}
					<span>Conditions of Use and Sale</span>. Please see our{' '}
					<span>Privacy Notice</span>, our <span>Cookies Notice</span>{' '}
					and our <span>Interest-Based Ads Notice</span>.
				</p>
			</div>
		),
		help: (
			<div className="need-help">
				<ArrowheadIcon fill="var(--signin-link)" direction="right" />
				<span>Need Help?</span>
			</div>
		),
		buying: (
			<div className="schizzness">
				<p>Buying for work?</p>
				<span>Shop on Scamazon Schizzness</span>
			</div>
		),
		textOverLine: (
			<div className="text-over-line">
				<hr />
				<p>New to Scamazon?</p>
			</div>
		),
	}

	const register = {
		heading: 'Create account',
		form: (
			<Form onSubmit={formik.handleSubmit}>
				<div className="input-group">
					<label htmlFor="fullname">Your name</label>
					<input
						type="text"
						name="fullname"
						id="fullname"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fullname || ''}
						className={
							formik.touched.fullname && formik.errors.fullname
								? 'error'
								: ''
						}
					/>
					{formik.touched.fullname && formik.errors.fullname && (
						<div className="error">{formik.errors.fullname}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="email">Mobile number or email</label>
					<input
						type="text"
						name="email"
						id="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email || ''}
						className={
							formik.touched.email && formik.errors.email
								? 'error'
								: ''
						}
					/>
					{formik.touched.email && formik.errors.email && (
						<div className="error">{formik.errors.email}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password || ''}
						className={
							formik.touched.password && formik.errors.password
								? 'error'
								: ''
						}
					/>
					{formik.touched.password && formik.errors.password && (
						<div className="error">{formik.errors.password}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="passwordConfirm">Re-enter password</label>
					<input
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.passwordConfirm || ''}
						className={
							formik.touched.passwordConfirm &&
							formik.errors.passwordConfirm
								? 'error'
								: ''
						}
					/>
					{formik.touched.passwordConfirm &&
						formik.errors.passwordConfirm && (
							<div className="error">
								{formik.errors.passwordConfirm}
							</div>
						)}
				</div>
				<AuthButton type="submit" $text="Continue">
					Continue
				</AuthButton>
			</Form>
		),
		legalese: (
			<div className="legalese">
				<p>
					By creating an account, you agree to Scamazon's{' '}
					<span>Conditions of Use and Sale</span>. Please see our{' '}
					<span>Privacy Notice</span>, our <span>Cookies Notice</span>{' '}
					and our <span>Interest-Based Ads Notice</span>.
				</p>
			</div>
		),
		buying: (
			<div className="schizzness">
				<p>Buying for work?</p>
				<span>Create a free Schizzness account</span>
			</div>
		),
		divider: <GradientDivider />,
		existing: (
			<div className="existing">
				<p>
					Already have an account?{' '}
					<button
						onClick={handleToggle}
						type="button"
					>
						<span>Sign in</span>
						<ArrowheadIcon
							fill="var(--signin-link)"
							direction="right"
						/>
					</button>
				</p>
			</div>
		),
	}

	const currentView = isSignIn ? signIn : register

	if (loading)
		return (
			<Container>
				<LogoContainer>
					<Logo />
				</LogoContainer>
				<InnerContainer>
					<p>Loading...</p>
				</InnerContainer>
			</Container>
		)

	

	return (
		<Container>
			<LogoContainer>
				<Logo />
			</LogoContainer>
			<InnerContainer>
				<FormContainer>
					<div className="header">
						<p>{currentView.heading}</p>
					</div>
					{error && <div className="error">{error.message || JSON.stringify(error)}</div>}
					{currentView.form}
					{currentView.legalese}
					{isSignIn && currentView.help}
					<div className="divider">
						<hr />
					</div>
					{currentView.buying}
					{!isSignIn && register.divider}
					{!isSignIn && register.existing}
				</FormContainer>
				{isSignIn && signIn.textOverLine}
				{isSignIn && (
					<AuthButton
						onClick={() => setIsSignIn(!isSignIn)}
						$text="Create your Scamazon account"
						type="button"
					>
						Create your Scamazon account
					</AuthButton>
				)}
			</InnerContainer>

			<GradientDivider $marginTop="var(--spacing-lg)" />
			<ul className="legalese">
				<li>
					<span>Conditions of Use</span>
				</li>
				<li>
					<span>Privacy Notice</span>
				</li>
				<li>
					<span>Help</span>
				</li>
				<li>
					<span>Cookies Notice</span>
				</li>
				<li>
					<span>Interest-Based Ads Notice</span>
				</li>
			</ul>
			<div className="copyright">
				<p>@ 1996-2024, Scamazon.com, Inc. or its affiliates</p>
			</div>
		</Container>
	)
}

const Container = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	button {
		box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	}
	p {
		color: var(--dk-blue);
		font-size: var(--font-xs);
	}
	span {
		font-size: var(--font-xs);
		color: var(--signin-link);
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	div.header {
		p {
			font-size: var(--font-xl);
		}
	}
	ul.legalese {
		margin-top: var(--spacing-md);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
	}
	div.copyright {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-md);
		p {
			color: var(--lt-text);
		}
	}
	div.label-and-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div.text-over-line {
		margin: 3rem 0 2rem 0;
		position: relative;
		hr {
			width: 100%;
			border: 1px solid var(--lt-grey);
		}
		p {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--white);
			padding: 0 var(--spacing-sm);
			color: var(--lt-text);
		}
	}
	div.existing {
		p {
			width: 100%;
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
		}
		button {
			display: flex;
			align-items: center;
			background: transparent;
			border: none;
			color: var(--signin-link);
			box-shadow: none;
			&:hover {
				text-decoration: underline;
			}
		}
		svg {
			margin-left: var(--spacing-ms);
			width: 0.5rem;
			path {
				stroke: var(--signin-link);
			}
		}
	}

	@media only screen and (max-width: 650px) {
		ul.legalese {
			flex-direction: column;
			gap: 0;
		}
	}
`

const InnerContainer = styled.div`
	width: 35rem;
	margin: 0 auto;

	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-lg);
	svg {
		width: 15rem;
	}
`

const FormContainer = styled.div`
	border-radius: var(--br-md);
	border: 1px solid var(--border-grey);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg);
	margin: 0 auto;
	div.divider {
		margin: var(--spacing-sm) 0 var(--spacing-xs) 0;
		hr {
			border: 1px solid var(--lt-grey);
		}
	}
	div.schizzness {
		p {
			font-weight: bold;
		}
		span {
		}
	}
	div.need-help {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		svg {
			width: 0.5rem;
			margin-top: 0.025rem;
			path {
				stroke: var(--dk-blue);
			}
		}
	}
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);

	div.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);

		label {
			font-size: var(--font-xs);
			font-weight: bold;
		}

		input {
			padding: var(--spacing-ms);
			border: 1px solid var(--border-grey);
			border-radius: var(--br-sm);

			&:focus {
				outline: 3px solid var(--input-focus);
				border: 1px solid var(--input-focus-border);
				background-color: var(--input-focus-bg);
			}
		}
	}
`

const AuthButton = styled.button`
	width: 100%;
	background-color: ${({ $text }) =>
		$text === 'Continue' ? 'var(--yellow)' : 'var(--white)'};
	color: var(--black);
	border: ${({ $login }) =>
		$login ? 'none' : '1px solid var(--border-grey)'};
	padding: var(--spacing-ms) var(--spacing-md);
	border-radius: var(--br-md);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: ${({ $text }) =>
			$text === 'Continue'
				? 'var(--yellow-hover)'
				: 'var(--continue-grey)'};
	}
`

const GradientDivider = styled.div`
	margin-top: ${({ $marginTop }) => $marginTop};
	width: 100%;
	height: 0.3rem;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.14),
		rgba(0, 0, 0, 0.03) 0.3rem,
		transparent
	);
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 4.4rem;
		background: linear-gradient(
			to right,
			#fff,
			rgba(255, 255, 255, 0),
			#fff
		);
	}
`
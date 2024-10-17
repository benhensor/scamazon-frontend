import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAddresses, setDefaultAddress, updateAddress, deleteAddress } from '../redux/slices/addressSlice'
import PlusIcon from '../icons/PlusIcon'
import styled from 'styled-components'

export default function Addresses() {
	const dispatch = useDispatch()
	const { addresses } = useSelector((state) => state.addresses)
  const [defaultAddressChanged, setDefaultAddressChanged] = useState(false)
  const [currentDefaultAddress, setCurrentDefaultAddress] = useState(null);
  let timeoutId;

	useEffect(() => {
		dispatch(fetchAddresses())
	}, [dispatch])

	useEffect(() => {
    const defaultAddress = addresses.find((address) => address.is_default);
    setCurrentDefaultAddress(defaultAddress?.address_id);
  }, [addresses]);

	useEffect(() => {
		console.log(currentDefaultAddress);
	}, [currentDefaultAddress]);

	const handleEdit = (id, updatedData) => {
    dispatch(updateAddress({ id, addressData: updatedData }));
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  const changeDefaultAddress = (id) => {
		console.log('Setting default address', id);
    dispatch(setDefaultAddress(id));
    setDefaultAddressChanged(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setDefaultAddressChanged(false);
      timeoutId = null; 
    }, 3000);
  };

	const addAddress = {
		id: 0,
		icon: <PlusIcon />,
		text: 'Add Address',
	}


	const AddressBlock = ({ address }) => {
		return (
			<Block>
				{address.id === 0 ? (
					<BlockContainer>
						<div className="container border-dash">
							<div className="add-address">
								<div className="icon">{address.icon}</div>
								<div className="text">
									<p>{address.text}</p>
								</div>
							</div>
						</div>
					</BlockContainer>
				) : (
					<BlockContainer>
						<div className="container border-solid">
							{address.isDefault && (
								<div className="default">Default</div>
							)}
							<div className="address">
								<p className="name">{address.full_name}</p>
								<p>{address.address_line1}</p>
								<p>{address.address_line2}</p>
								<p>{address.city}</p>
								<p>{address.postcode}</p>
								<p>{address.county}</p>
								<p>{address.country}</p>
								<p>{address.phone_number}</p>
								<p>{address.deliveryInstructions}</p>
								<p className="primary-link">
									Add delivery instructions
								</p>
							</div>
							<div className="address-controls">
								<button className="primary-link" onClick={() => handleEdit(address.address.id)}>Edit</button>|
								<button className="primary-link" onClick={() => handleDelete(address.address.id)}>Remove</button>
								{!address.is_default && (
									<>
										|
										<button className="primary-link" onClick={() => changeDefaultAddress(address.address_id)}>
											Set as default
										</button>
									</>
								)}
							</div>
						</div>
					</BlockContainer>
				)}
			</Block>
		)
	}

	return (
		<PageContainer>
			<Page>
				<div className="breadcrumb">
					<Link to='/account' className="primary-link">Your Account</Link>
					<span>▸</span>
					<p>Your Addresses</p>
				</div>
        {defaultAddressChanged && (
          <div className="new-default-address">
            <div className="bar"></div>
            <div className="check">✔</div>
            <h2>Default address changed</h2>
          </div>
        )}
				<PageHeader>
					<h1>Your Addresses</h1>
				</PageHeader>
				<LayoutGrid>
					<Link to='/account/addresses/new-address'>
						<AddressBlock address={addAddress} />
					</Link>
					{addresses.map((address) => (
						<AddressBlock key={address.address_id} address={address} />
					))}
				</LayoutGrid>
			</Page>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

const Page = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin: var(--spacing-md) 0;
		font-size: var(--font-xs);
		p {
			color: var(--order-breadcrumb);
		}
		span {
			margin-bottom: 2px;
		}
	}
  .new-default-address {
    border: 2px solid var(--def-address-green);
    border-radius: var(--br-lg);
    overflow: hidden;
    width: 100%;
    height: 7rem;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    .bar {
      margin-right: var(--spacing-lg);
      background-color: var(--def-address-green);
      width: 1.5rem;
      height: 100%;
    }
    .check {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-xs);
      border-radius: var(--br-50);
      background-color: var(--def-address-green);
      color: var(--white);
      font-size: var(--font-xs);
      width: 2rem;
      height: 2rem;
    }
    h2 {
      font-size: var(--font-md);
      color: var(--black);
    }
  }
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: 0;
	}
`

const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}
`

const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3 even columns */
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr); /* 1 column for mobile */
		gap: var(--spacing-sm);
	}
	@media only screen and (max-width: 450px) {
		gap: 0;
	}
`

const Block = styled.div`
	position: relative;
	width: 100%;
	padding-top: 100%; /* This maintains the square aspect ratio */
	transition: var(--tr-fast);

	@media only screen and (max-width: 450px) {
		padding-top: 100%;
		border: none;
	}

	/* Content container to ensure proper positioning of content inside the square */
	& > * {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

const BlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.container {
    border-radius: var(--br-lg);
		width: 100%;
		height: 100%;
		overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	}
	.border-dash {
    cursor: pointer;
		border: 1px dashed var(--md-grey);
	}
	.border-solid {
		border: 1px solid var(--md-grey);
	}
	.add-address {
    width: 100%;
    height: 100%;
		display: flex;
    flex-direction: column;
		align-items: center;
		justify-content: center;
    color: var(--paleblue);
    font-size: var(--font-xl);
		svg {
			width: 3rem;
			height: 3rem;
			fill: var(--paleblue);
		}
	}
	.default {
    background-color: var(--yellow);
    border-bottom: 1px solid var(--border-grey);
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: var(--font-xs);
    font-weight: bold;
	}
	.address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: var(--font-sm);
    padding: var(--spacing-lg);
	}
	.name {
    font-size: var(--font-md);
		font-weight: bold;
	}
	.address-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		&:hover {
			background-color: transparent;
		}
	}
`
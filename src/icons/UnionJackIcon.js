import React from 'react'
import styled from 'styled-components'
import ArrowheadIcon from './ArrowheadIcon'

export default function UnionJackIcon() {
	return (
    <Container>
      <SVG
        width="60"
        height="45"
        viewBox="0 0 60 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9_71975)">
          <g clipPath="url(#clip1_9_71975)">
            <path d="M0 0H60V45H0V0Z" fill="#012169" />
            <path
              d="M7.03125 0L29.9062 16.9688L52.6875 0H60V5.8125L37.5 22.5938L60 39.2812V45H52.5L30 28.2188L7.59375 45H0V39.375L22.4062 22.6875L0 6V0H7.03125Z"
              fill="white"
            />
            <path
              d="M39.75 26.3438L60 41.25V45L34.5938 26.3438H39.75ZM22.5 28.2188L23.0625 31.5L5.0625 45H0L22.5 28.2188ZM60 0V0.28125L36.6562 17.9062L36.8438 13.7812L55.3125 0H60ZM0 0L22.4062 16.5H16.7812L0 3.9375V0Z"
              fill="#C8102E"
            />
            <path
              d="M22.5938 0V45H37.5938V0H22.5938ZM0 15V30H60V15H0Z"
              fill="white"
            />
            <path
              d="M0 18.0938V27.0938H60V18.0938H0ZM25.5938 0V45H34.5938V0H25.5938Z"
              fill="#C8102E"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_9_71975">
            <rect width="60" height="45" fill="white" />
          </clipPath>
          <clipPath id="clip1_9_71975">
            <rect width="60" height="45" fill="white" />
          </clipPath>
        </defs>
      </SVG>
      <ArrowheadIcon fill='var(--lt-grey' direction='down'/>
    </Container>
	)
}

const Container = styled.div`
  width: 4rem;
  height: auto;
  display: flex;
  align-items: center;
`

const SVG = styled.svg`
	width: 2.5rem;
	height: auto;
`
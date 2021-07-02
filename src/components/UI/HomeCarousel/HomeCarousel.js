import React from 'react';
import {Carousel} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {data} from './home_img'
import './HomeCarousel.css'

const HomeCarousel = () => {
	return (
		<Carousel controls={true} indicators={false} interval={100000} pause={false} fade={false}>
			{
				data.map((data,index) => (
					<Carousel.Item key={index}>
						<img
							className="d-block w-100"
							src={data.img}
							alt="First slide"
						/>
						<Carousel.Caption className={'h-100 align-items-center d-flex'}>
							<div className={data.css}>
								<h1 className={'carousel__text text-uppercase'}>{ data.text }</h1>
								<NavLink to={'/questionare'}><a className={'btn btn-warning btn-lg quote-btn'}>Get a Quote</a></NavLink>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				))
			}
		</Carousel>

	);
};

export default HomeCarousel;

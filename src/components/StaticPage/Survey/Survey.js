import React from 'react';
import './Survey.css'
import {Card, Col, Container, Row, Form} from "react-bootstrap";

const Survey = props => {
	const id = props.match.params.id;
	const yesClickHandler = () => {
		props.history.replace('/survey-form/' + id)
	}

	const noClickHandler = () => {
		props.history.replace('/')
	}
	return (
		<>
			<div id={'top'} className={'d-flex justify-content-center'}>
				<h2 className={'survey__heading'}>Quick Survey Of Our Representatives</h2>
			</div>
			<Container className={'mt-5'}>
				<Row className={'justify-content-center'}>
					<Col md={9}>
						<Card className={'shadow-lg p-5'}>
							<Card.Body className={'text-center'}>
								<p>We train our representatives to be professional and to meet set standards. Your feedback is valuable and will help us provide the best possible service to all our customers. Please do you mind taking a minute to answer this survey regarding your last engagement with one of our representatives?</p>
								<div className={'mt-5'}>
									<div className="form-check form-check-inline">
										<input className="form-check-input" type="radio"  onClick={yesClickHandler} />
										<label className="form-check-label pt-2">Yes</label>
									</div>

									<div className="form-check form-check-inline">
										<input className="form-check-input" type="radio"  onClick={noClickHandler}  />
										<label className="form-check-label pt-2">No</label>
									</div>
								</div>
								<p className={'mt-4'}>
									Thank you for taking time to fill out our form. You will receive a quote by email within 72 hours.
								</p>
								<h4 style={{fontWeight: 'bold'}}>HAVE A GREAT ONE!</h4>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Survey;

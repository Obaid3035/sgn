import React, {useState} from 'react';
import axios from "axios";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";

const SurveyForm = props => {

	const id = props.match.params.id;
	const [loader, setLoader] = useState(true);

	const [surveyField, setSurveyField] = useState({
		lastInteractive: null,
		representative: null,
		recommend: null,
		code: 0
	})

	const lastInteractiveHandler = (e) => {
		const { name, value } = e.target;
		const updated = {...surveyField};
		updated[name] = value;
		setSurveyField(updated)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		console.log(surveyField)
		axios.put('/quote/' + id, surveyField)
			.then((res) => {
				setLoader(false)
				props.history.replace('/')
			})
	}

	return (
		<>
			<div id={'top'} className={'d-flex justify-content-center'}>
				<h2 className={'survey__heading'}>Quick Survey Of Our Representatives</h2>
			</div>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card text-center bg-white survey-card border-0">
								<div className="py-5 px-4">
									<p className="text-center">We train our representatives to be professional and to
										meet set standards. Your feedback is valuable and will help us provide the best
										possible service to all our customers. Please do you mind taking a minute to
										answer this
										survey regarding your last engagement with one of our representatives? </p>
									<form action="" className="mt-5 survey-form" onSubmit={onSubmitHandler}>
										<div className="form-group">
											<label htmlFor="">1. On the scale of 1 to 10, how satisfied were you with your last interaction with our representative?</label>
											<div className="d-inline-flex justify-content-center">
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio1" value={'1'} onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio1">1</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio2" value="2" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio2">2</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio3" value="3" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio3">3</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio4" value="4" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio4">4</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio5" value="5" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio5">5</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio6" value="6" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio6">6</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio7" value="7" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio7">7</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio8" value="8" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio8">8</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio9" value="9" onChange={lastInteractiveHandler}
													/>
														<label className="form-check-label"
														       htmlFor="inlineRadio9">9</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="lastInteractive" id="inlineRadio10"
													       value="10" onChange={lastInteractiveHandler} />
														<label className="form-check-label"
														       htmlFor="inlineRadio10">10</label>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="">2. On the scale of 1 to 10, how clear was our representative’s presentation?</label>
											<div className="d-inline-flex justify-content-center">
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio1" value="1" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio1">1</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio2" value="2" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio2">2</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio3" value="3" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio3">3</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio4" value="4" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio4">4</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio5" value="5" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio5">5</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio6" value="6" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio6">6</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio7" value="7" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio7">7</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio8" value="8" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio8">8</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio9" value="9" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio9">9</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="representative" id="inlineRadio10"
													       value="10" onChange={lastInteractiveHandler} />
														<label className="form-check-label"
														       htmlFor="inlineRadio10">10</label>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="">3. On the scale of 1 to 10, how likely would you recommend our company to friends and family?</label>
											<div className="d-inline-flex justify-content-center">
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio1" value="1" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio1">1</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio2" value="2" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio2">2</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio3" value="3" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio3">3</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio4" value="4" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio4">4</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio5" value="5" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio5">5</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio6" value="6" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio6">6</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio7" value="7" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio7">7</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio8" value="8" onChange={lastInteractiveHandler} />
														<label className="form-check-label"
														       htmlFor="inlineRadio8">8</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       required
													       name="recommend" id="inlineRadio9" value="9" onChange={lastInteractiveHandler} />

														<label className="form-check-label"
														       htmlFor="inlineRadio9">9</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio"
													       name="recommend" id="inlineRadio10"
													       required
													       value="10" onChange={lastInteractiveHandler} />
														<label className="form-check-label"
														       htmlFor="inlineRadio10">10</label>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="">4. Please enter your referral code</label>
											<input type="text" className="form-control" name={'code'} value={surveyField.code}
											       required
											       onChange={lastInteractiveHandler}
											       aria-describedby="referralcode" />
										</div>

										<p className="para">All done, Thank you for your feedback!</p>
										{
											loader ?
												<button  role="button" type="submit"
												         className="get-quote submit btn">submit</button>
												: <ProgressBar />
										}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SurveyForm;

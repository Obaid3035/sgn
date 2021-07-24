import React, {useEffect, useState} from "react";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import axios from "axios";

const GetInTouch = props => {
	const [getInTouchData, setGetInTouchData] = useState([]);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios.get('/admin/getInTouch')
			.then((res) => {
				setLoaded(true)
				console.log(res.data)
				setGetInTouchData(res.data)
			})
	}, [loaded])

	const getInTouchDelete = (id) => {
		axios.delete('/admin/getInTouch/'+ id)
			.then((res) => {
				setLoaded(false)
				console.log(res.data)
			})
	}
	const table = getInTouchData.map((getInTouch, index) => {
		return (
			<tr key={index}>
				<td>{getInTouch.id}</td>
				<td>{getInTouch.name}</td>
				<td>{getInTouch.email}</td>
				<td>{getInTouch.description}</td>
				<td>
					<button type="button" onClick={() => getInTouchDelete(getInTouch.id)} className="btn btn-danger">Delete
					</button>
				</td>
			</tr>
		)
	})
	return (
		<div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12 job-list">
						<div className="card">
							<div className="card-body">
								<div className="col-md-12 my-5">
									<h4>Get In Touch</h4>
									<div className="row">
										<div className="col-md-12">
											<div className="table-responsive">
												{loaded ? getInTouchData.length > 0
													?<table className="table">
														<thead className="">
														<tr>
															<th>
																ID
															</th>
															<th>
																Name
															</th>
															<th>
																Email
															</th>
															<th>
																Description
															</th>
															<th>
																Action
															</th>
														</tr>
														</thead>
														<tbody>
														{table}
														</tbody>
													</table>
													: <h4 className="text-center">No Get In Touch Found</h4>
													: <div className="text-center"><Spinner /></div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GetInTouch;
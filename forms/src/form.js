import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function SimpleContainer() {
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		pass: "",
	});
	const [nameErr, setNameErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [passErr, setPassErr] = useState("");
	const [nerror, setNerror] = useState(0);
	const [eerror, setEerror] = useState(0);
	const [perror, setPerror] = useState(0);

	function handleName(name) {
		setNameErr("");
		if (name.length === 0) {
			setNameErr("Username is required");
			setNerror(1);
		} else {
			setNerror(0);
		}
	}
	function handleMail(email) {
		if (email === "") {
			setEmailErr("Email is required");
			setEerror(1);
		} else if (email.split("@").length !== 2) {
			setEmailErr("Invalid Email");
			setEerror(1);
		} else {
			setEmailErr("");
			setEerror(0);
		}
	}
	function handlePass(pass) {
		if (pass.length === 0) {
			setPassErr("Password is required");
			setPerror(1);
		} else {
			setPassErr("");
			setPerror(0);
		}
		let count = 0;
		let checkSpecial = /[*@$!#%&()^~{}]+/.test(pass);
		if (checkSpecial) {
			count = count + 1;
		}
		let checkUpper = /[A-Z]+/.test(pass);
		if (checkUpper) {
			count = count + 1;
		}
		if (count === 0 && perror === 0) {
			setPassErr("Password is very weak   ");
		} else if (count === 1 && perror === 0) {
			setPassErr("Password is weak");
		} else if (count === 2 && perror === 0) {
			setPassErr("Password is good");
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm">
				<h1>Dynamic Form</h1>
				<input
					className="inputfield"
					id="username"
					placeholder="UserName"
					value={formValues.name}
					style={{ border: nerror ? "1px solid red" : "" }}
					onChange={(e) => {
						handleName(e.target.value);
						setFormValues({
							name: e.target.value,
							email: formValues.email,
							pass: formValues.pass,
						});
					}}
				/>
				<p className="error">{nameErr}</p>
				<input
					className="inputfield"
					id="email"
					placeholder="E-mail"
					value={formValues.email}
					style={{ border: eerror ? "1px solid red" : "" }}
					onChange={(e) => {
						handleMail(e.target.value);
						setFormValues({
							name: formValues.name,
							email: e.target.value,
							pass: formValues.pass,
						});
					}}
				/>
				<p className="error">{emailErr}</p>
				<input
					className="inputfield"
					id="pass"
					placeholder="Password"
					value={formValues.pass}
					style={{ border: perror ? "1px solid red" : "" }}
					type="password"
					onChange={(e) => {
						handlePass(e.target.value);
						setFormValues({
							name: formValues.name,
							email: formValues.email,
							pass: e.target.value,
						});
					}}
				/>
				<p className="error">{passErr}</p>
				{console.log(formValues)}
			</Container>
		</React.Fragment>
	);
}

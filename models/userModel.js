fs = require('fs');

let datab;
fs.readFile('db.json', 'utf8', function (err,data) { 
  if (err) {
    return console.log(err);
  }else{
    datab = JSON.parse(data);
  }
});

const userModel = {
	findOne: (email) => {
		for (let i = 0; i < datab.length; i++) {
		if (datab[i].email == email) {
			return datab[i];
		}
		throw new Error(`Couldn't find user with email: ${email}`);
		}
	},
	findById: (id) => {
		for (let i = 0; i < datab.length; i++) {
		if (datab[i].id == id) {
			console.log(`IDs:::::${datab[i].id}`);
			return datab[i];
		}
		throw new Error(`Couldn't find user with id: ${id}`);
		}
	},
	findByGithubId: (githubId) => {
		for (let i = 0; i < datab.length; i++) {
			if (datab[i].githubId == githubId) {
				return datab[i];
			}
			console.log(datab[i].githubId);
		}
		// throw new Error(`Couldn't find user with githubId: ${githubId}`);
		return null
	},
	createUserByGithubId: (githubId) => {
		let user = {
			githubId: githubId
		}
		datab.push(user);
		fs.writeFile('db.json', JSON.stringify(datab), function (err) {
			if (err) return console.log(err);
		});
		return user;
	}

};

module.exports = { datab, userModel };
  
    // const user = datab.find((user) => user.email === email);
    // if (user) {
    //   return user;
      
    // }
    // throw new Error(`Couldn't find user with email: ${email}`);
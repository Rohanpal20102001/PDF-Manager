const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// SignUp User
const signUp = async (req, res) => {
  const { email, name, password } = req.body;

  // Checks if the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        message: "User Already Exsists!",
      });
    }
  } catch (err) {
    console.log(err);
  }

  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({
      userDetails: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// SignIn User
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user is registered or not
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found, please signup before proceeding",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
      } else {
        const payload = { email: email };

        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              return res.status(500).send(err);
            }
            return res.status(200).json({
              message: "User logged in",
              token: token,
              user: {
                user,
              },
              newLogin: user.email === "NA" ? true : false,
            });
          }
        );
        user.isAccountVerified = true;
        user.email = email;
        await user.save();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUp,
  signIn,
};

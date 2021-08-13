const User = require('../models/user')
module.exports.renderRegister = (req, res) => {
    res.render('user/register')
}

module.exports.register = async (req, res) => {
    try {

        const { username, email, password, phone } = req.body
        const user = new User({ username: username, email: email, phone: phone })
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if (err) {
                return next(err)
            }
            else {
                req.flash('success', 'Welcome to Food-friends!')
                const redirectUrl = req.session.returnTo || '/main/home'
                res.redirect(redirectUrl)
            }
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/user/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('user/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/main/home'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Logged out successfully!')
    res.redirect('login')
}


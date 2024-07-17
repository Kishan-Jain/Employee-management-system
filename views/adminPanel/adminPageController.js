const adminMain = (req, res) => {
    res.render('adminPanel/mainAdminPage.ejs', {'title' : 'Admin Page'});
}

export {adminMain}
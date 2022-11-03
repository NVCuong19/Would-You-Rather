const checker = (store) => (next) => (action) => {
    const user = sessionStorage.getItem('userInfo');
    if(!user) {
        // alert( "You must be logged in to continue" );

    }
    return next(action)
};

export default checker;
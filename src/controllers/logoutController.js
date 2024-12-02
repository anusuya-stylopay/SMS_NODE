const logout=(req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.json({ success: false, error: 'Error destroying session' });
        }
        console.log('Session expired:', req.sessionID);
        return res.json({ success: true });
    });
};
module.exports = { logout }
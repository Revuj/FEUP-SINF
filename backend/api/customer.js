module.exports = (server) => {

   server.get('/api/customer/:id', (req, res) => {

        const {id} = req.params;
        const options = {
            method: 'GET',
            url: `${global.basePrimaveraUrl}/salesCore/customerParties/${id}`
        };

        return global.request(options, function (error, response, body) {
            if (error) throw new Error(error.message);
            res.json(JSON.parse(body));
        });
   });
}
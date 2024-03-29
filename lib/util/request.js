var debug       = require( 'debug' )( 'wpcom-vip:request' );
var superagent  = require( 'superagent' );

function Request( wpcomVIP ) {
    this.wpcomVIP = wpcomVIP;
}

Request.prototype.addAuthorization = function( request ) {
    if ( ! this.wpcomVIP || ! this.wpcomVIP.auth ) {
        return request;
    }

    return request
        .set( 'API-User-ID', this.wpcomVIP.auth.apiUserId )
        .set( 'Access-Token', this.wpcomVIP.auth.token );
};

Request.prototype.get = function( url ) {
    url = this.makeUrl( url );

    var request = superagent
        .get( url )
        .timeout( this.wpcomVIP.API_TIMEOUT );

    return this.addAuthorization( request );
};

Request.prototype.post = function( url ) {
    url = this.makeUrl( url );

    var request = superagent
        .post( url )
        .timeout( this.wpcomVIP.API_TIMEOUT );

    return this.addAuthorization( request );
};

Request.prototype.put = function( url ) {
    url = this.makeUrl( url );

    var request = superagent
        .put( url )
        .timeout( this.wpcomVIP.API_TIMEOUT );

    return this.this.addAuthorization( request );
};

Request.prototype.delete = function( url ) {
    url = this.makeUrl( url );

    var request = superagent
        .delete( url )
        .timeout( this.wpcomVIP.API_TIMEOUT );

    return this.addAuthorization( request );
};

Request.prototype.makeUrl = function( part ) {
    return this.wpcomVIP.API_URL + '/v' + this.wpcomVIP.API_VERSION + part;
};

module.exports = Request;

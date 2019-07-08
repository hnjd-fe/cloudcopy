console.log( 'background', Date.now() );

import config from './config.js';
import db from './db.js';
import md5 from './utils/md5.js'

main();

/*
{
  "info": {
    "editable": false,
    "frameId": 0,
    "menuItemId": "save-anywhere",
    "pageUrl": "chrome://extensions/",
    "selectionText": "ID：opkoninacfpinfmklefkfdklgdebdoen"
  },
  "tag": {
    "active": true,
    "audible": false,
    "autoDiscardable": true,
    "discarded": false,
    "favIconUrl": "",
    "height": 946,
    "highlighted": true,
    "id": 538,
    "incognito": false,
    "index": 0,
    "mutedInfo": {
      "muted": false
    },
    "pinned": false,
    "selected": true,
    "status": "complete",
    "title": "扩展程序",
    "url": "chrome://extensions/",
    "width": 932,
    "windowId": 29
  }
}
*/

function addNote(info, tab) {

	let note = [ tab.title + info.selectionText ].join( ' - ' )
    let data = {
		note: `${note}`
		, siteUrl: tab.url
		, siteTitle: tab.title
		, md5: md5( note )
		, width: tab.width.toString()
		, height: tab.height.toString()
	}
	console.log( 'addNote', Date.now(), data );

	return db.add( data );
}

let copyNoti;

function main(){
    if( typeof chrome == 'undefined' ) return;

    var menuItem = chrome.contextMenus.create({
        "id": config.dbName
        , "title": "svae selection text"
        , "contexts": ["selection"]
    });

    /*
    var child1 = chrome.contextMenus.create( {
        "id": "save text"
        , "title": "save text"
        , "parentId": menuItem
        , "contexts": ["selection"]
    });
    */

    chrome.contextMenus.onClicked.addListener( function(info, tab){
        switch( info.menuItemId ){
            case config.dbName: {
                addNote( info, tab ).then( (data)=>{
						copyNoti = chrome.notifications.create(
							config.dbName,{   
								type: 'basic', 
								iconUrl: '../assets/img/save-everywhere48.png', 
								title: `${config.dbName} copy done!`, 
								message: `${info.selectionText}`
							},
							function() {
								console.log( 'notification done' );
								chrome.notifications.clear( config.dbName, ()=>{
									console.log( 'clear done', Date.now() );
								});
							} 
						);
					}
				);
                break;
            }
        }
    } )
}


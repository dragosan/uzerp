<?php
 
/** 
 *	(c) 2017 uzERP LLP (support#uzerp.com). All rights reserved. 
 * 
 *	Released under GPLv3 license; see LICENSE. 
 **/
class TicketSeverityCollection extends DataObjectCollection {
	
	public $field;
		
	function __construct($do='TicketSeverity') {
		parent::__construct($do);
	}
	
}
?>
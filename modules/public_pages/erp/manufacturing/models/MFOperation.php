<?php
 
/** 
 *	(c) 2017 uzERP LLP (support#uzerp.com). All rights reserved. 
 * 
 *	Released under GPLv3 license; see LICENSE. 
 **/
class MFOperation extends DataObject {

	protected $version='$Revision: 1.4 $';
	
	protected $defaultDisplayFields = array('op_no'
											,'start_date'
											,'end_date'
											,'remarks'
											,'stitem_id'
											,'mfcentre_id'
											,'mfresource_id'
											,'volume_period'
											,'volume_uom_id'
											,'volume_uom'
											,'quality_target'
											,'uptime_target'
											,'volume_target'
											,'resource_qty'
											,'resource'
											);
	
	function __construct($tablename='mf_operations') {
		parent::__construct($tablename);
		$this->idField='id';
		$this->identifierField='id';
		
		
 		$this->validateUniquenessOf(array('stitem_id', 'op_no'));
 		$this->belongsTo('STItem', 'stitem_id', 'stitem');
 		$this->belongsTo('MFCentre', 'mfcentre_id', 'mfcentre');
 		$this->belongsTo('MFResource', 'mfresource_id', 'mfresource'); 
 		$this->belongsTo('STuom', 'volume_uom_id', 'volume_uom'); 

		$this->setEnum('volume_period',array( 'S'=>'Second'
										  ,'M'=>'Minute'
										  ,'H'=>'Hour'));
 		
	}

	public static function globalRollOver() {
		$db = DB::Instance();
		$date = date('Y-m-d');
		$query = "UPDATE mf_operations
					SET std_cost=latest_cost,std_lab=latest_lab,std_ohd=latest_ohd
					WHERE (start_date <= '".$date."' OR start_date IS NULL) AND (end_date > '".$date."' OR end_date IS NULL) AND usercompanyid=".EGS_COMPANY_ID;
		return ($db->Execute($query) !== false);
	}

}
?>
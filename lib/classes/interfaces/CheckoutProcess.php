<?php
 
/** 
 *	(c) 2017 uzERP LLP (support#uzerp.com). All rights reserved. 
 * 
 *	Released under GPLv3 license; see LICENSE. 
 **/
interface CheckoutProcess {
	function step(Controller $controller,$step=1);

	function numSteps();

}
?>
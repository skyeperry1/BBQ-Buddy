# BBQ-Buddy
                             (    (        )  
   (   (    (       (        )\ ) )\ )  ( /(  
 ( )\( )\ ( )\    ( )\    ( (()/((()/(  )\()) 
 )((_)((_))((_)   )((_)   )\ /(_))/(_))((_)\  
((_)((_)_((_)_   ((_)_ _ ((_|_))_(_))___ ((_) 
 | _ ) _ )/ _ \   | _ ) | | ||   \|   \ \ / / 
 | _ \ _ \ (_) |  | _ \ |_| || |) | |) \ V /  
 |___/___/\__\_\  |___/\___/ |___/|___/ |_|   
 Open Source BBQ Controller and Monitor
v 0.0.1
Last Modified 2016-02-11

CONTENTS
I. OVERVIEW
	Ia. Introduction
	Ib. Goals
	Ic. Components
	Id. Plan
II. HARDWARE
III. SOFTWARE
IV. RESOURCES
V. PROJECT TIMELINE

********************************************
I. OVERVIEW
********************************************

Ia. Introduction
******************
Barbecuing is a fine mix of science, art, and devotion. Smoking a great rack of ribs requires perfect equilibrium between of a number of variables. When cooking with wood or charcoal arguably one the most difficult variables to control is the heat, But by using a small DC air blower we can effectively act as a thermostat on the smoker by feeding the coals oxygen(while the blower is running) or by choking the coals(in a nominal state). By monitoring the temperature in the smoker pit and then adjusting our blower output accordingly we can control the temperature and eliminate the need to consistently tend to the smoker. There are already several commercial products(BBQ GURU / BBQ VIPER) and open source products(HEATERMETER)  that can do this. The commercial products are generally very expensive ($200-$350) and the open source products are even still fairly pricey for parts.


Ib. Goals
******************
The goal of the project is to re-design an open-source BBQ controller that includes the functionality of the top-end commercial controllers at half of the cost of the leading open source BBQ controller, The HeaterMeter($182 build cost + 1 probe). This can be accomplished by using a combination of newer hardware and simplifying the software. The main goals are:

1. Control the temperature of the BBQ via blower fan and PID
Algorithm.

2. Monitor the temperature of the meat with food probes and alert the user when the meat has reached its target temp or a timer has finished.

3. Push the cooking data to the web via WLAN to web interface for remote temperature monitoring and graphing.

4. Create an on-board touchscreen GUI for local setup, configuration and monitoring of the BBQ. 

5. Simple assembly and setup of the final controller using standardized hardware. 

6. Total Cost =< $100 for a complete set up with 2 probes

Extra Goals:
-Texting alerts?
-Battery / Solar Power? 
-any other features to add?

Ic. Components
****************** 
Overview: 

1 - Arduino pro mini ($3) ebay
2 - Maveric ET-73 oven and meat probes($26)	ebay
1 - TFT Touchscreen($15)	ebay
1 - Rasperry Pi Zero($5)	?? HAVE TO WAIT 'TILL PRICE STABILIZES 
1 - Esp8266 Serial Wifi Module ($3) ebay
1 - Piezio Buzzer for alarm ($1) ebay
1 - 5v DC Blower fan ($5) ebay
1 - Custom PBC Board ($2?) dirtcheapdirtyPCBs.com or OHS Park
4 - 220 Ohm Resistors ($1) ebay
1 - 47Pf Capacitor ($1) ebay
1 - 6" x 3/4" BLK steel pipe to mount blower to BBQ ($4) Home Depot
2 - 1591 Hammond box for blower and controller ($9) Digikey
1 - 20mm LED for sweet light show ($1) ebay
1 - Wall Power Supply($6) ebay
4 - 2.5mm mono jack($4)
3 - DC 2.5mm pin power jacks ($2)

Total = $88
















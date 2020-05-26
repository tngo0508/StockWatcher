#!/usr/bin/python3

import pandas
import pprint
from alpha_vantage.timeseries import TimeSeries
from alphavantage_key import key
ts = TimeSeries(key=key)
# Get json object with the intraday data and another with  the call's metadata
data, meta_data = ts.get_intraday('GOOGL')

pprint.pprint(data)
pprint.pprint(meta_data)
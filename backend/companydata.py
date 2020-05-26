import yfinance as yf;
import json;

## Get info about company
msft = yf.Ticker("MSFT");

# Write data to file in current powershell dir
file = open("./log/msft.txt","w");
file.write(json.dumps(msft.info));
file.close();

print(msft.info);
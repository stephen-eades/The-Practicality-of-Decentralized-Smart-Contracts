#!/usr/bin/env python
# coding: utf-8

# 
# <h1>Smart Contract Data Analysis</h1>
# <h2>IT8010 Capstone Project</h2>
# <h3>Instructed by Dr. Murat Ozer</h3>
# <p>Stephen Eades - Eadessn@mail.uc.edu</p>
# <p>April 14th, 2021</p>

# <br>
# <h2>Preparing Data</h2>

# In[415]:


# Import packages
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
from pandas import Series, DataFrame
import pandas as pd
get_ipython().run_line_magic('matplotlib', 'inline')


# In[416]:


# Read in each csv file 
event_manager_deploy_csv = pd.read_csv('data/EventManagerDeploy.csv')
event_creator_deploy_csv = pd.read_csv('data/EventCreatorDeploy.csv')
poll_event_deploy_csv = pd.read_csv('data/PollEventDeploy.csv')
escrow_event_deploy_csv = pd.read_csv('data/EscrowEventDeploy.csv')
lottery_event_deploy_csv = pd.read_csv('data/LotteryEventDeploy.csv')
lottery_event_deploy_input_increase_csv = pd.read_csv('data/LotteryEventDeployInputIncrease.csv')
poll_event_vote_transaction_csv = pd.read_csv('data/PollEventVoteTransaction.csv')
escrow_event_deposit_transaction_csv = pd.read_csv('data/EscrowEventDepositTransaction.csv')


# In[418]:


# Put csv data into DataFrame
event_manager_deploy_df = pd.DataFrame(event_manager_deploy_csv)
event_creator_deploy_df = pd.DataFrame(event_creator_deploy_csv)
poll_event_deploy_df = pd.DataFrame(poll_event_deploy_csv)
escrow_event_deploy_df = pd.DataFrame(escrow_event_deploy_csv)
lottery_event_deploy_df = pd.DataFrame(lottery_event_deploy_csv)
lottery_event_deploy_input_increase_df = pd.DataFrame(lottery_event_deploy_input_increase_csv)
poll_event_vote_transaction_df = pd.DataFrame(poll_event_vote_transaction_csv)
escrow_event_deposit_transaction_df = pd.DataFrame(escrow_event_deposit_transaction_csv)


# <br>
# <h2>EventManager & EventCreator Contracts</h2>

# In[419]:


# Setup our variables
manager_x = event_manager_deploy_df.timestamp
manager_y = event_manager_deploy_df.total_cost_eth
creator_x = event_creator_deploy_df.timestamp
creator_y = event_creator_deploy_df.total_cost_eth
# Both contract deploy together, so gas price is same for both
creator_gas_price = event_creator_deploy_df.gas_price_gwei


# In[420]:


# EventManager Deployment: Total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(creator_x, manager_y, color="b", label="Manager")
ax2.plot(creator_x, creator_gas_price, color="purple", label="Gas Price")
ax1.plot(creator_x, creator_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='b')
plt.ylim(top=0.3, bottom=0.1)
plt.legend()
plt.show()


# In[421]:


# EventCreator Deployment: Total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(creator_x, creator_y, color="g", label="Creator")
ax2.plot(creator_x, creator_gas_price, color="purple", label="Gas Price")
ax1.plot(creator_x, creator_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='green')
plt.ylim(top=0.9, bottom=0.5)
plt.legend()
plt.show()


# In[422]:


# EventManager & EventCreator Deployment: Comparing total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(creator_x, manager_y, color="b", label="Manager")
ax2.plot(creator_x, creator_y, color="g", label="Creator")
ax2.plot(creator_x, creator_gas_price, color="purple", label="Gas Price")
ax1.plot(creator_x, creator_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='b')
plt.ylim(top=0.9, bottom=0.1)
plt.legend()
plt.show()


# <br>
# <h2>PollEvent, EscrowEvent, & LotteryEvent Contracts</h2>

# In[423]:


# Setup our variables

poll_x = poll_event_deploy_df.timestamp
poll_y = poll_event_deploy_df.total_cost_eth
escrow_x = escrow_event_deploy_df.timestamp
escrow_y = escrow_event_deploy_df.total_cost_eth
lottery_x = lottery_event_deploy_df.timestamp
lottery_y = lottery_event_deploy_df.total_cost_eth
poll_gas_price = poll_event_deploy_df.gas_price_gwei
escrow_gas_price = escrow_event_deploy_df.gas_price_gwei
lottery_gas_price = lottery_event_deploy_df.gas_price_gwei


# In[424]:


# PollEvent Deployment: Total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(poll_x, poll_y, color="b", label="Poll Cost")
ax2.plot(poll_x, poll_gas_price, color="purple", label="Gas Price")
ax1.plot(poll_x, poll_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='b')
plt.ylim(top=0.4, bottom=0.2)
plt.legend()
plt.show()


# In[425]:


# EscrowEvent Deployment: Total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(escrow_x, escrow_y, color="r", label="Escrow Cost")
ax2.plot(escrow_x, escrow_gas_price, color="purple", label="Gas Price")
ax1.plot(escrow_x, escrow_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='r')
plt.ylim(top=0.4, bottom=0.2)
plt.legend()
plt.show()


# In[426]:


# LotteryEvent Deployment: Total cost of deployment and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(lottery_x, lottery_y, color="g", label="Lottery Cost")
ax2.plot(lottery_x, lottery_gas_price, color="purple", label="Gas Price")
ax1.plot(lottery_x, lottery_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='green')
plt.ylim(top=0.8, bottom=0.5)
plt.legend()
plt.show()


# In[427]:


# PollEvent, EscrowEvent, & LotterEvent: Comparing total cost of deployment

fig, ax1 = plt.subplots()
ax2 = ax1
# These contracts deployed at different times, so gas prices are not consistent
# Therefore timestamp is used solely to plot data on a uniform x-axis. 
ax2.plot(poll_x, poll_y, color="b", label="Poll Cost")
ax2.plot(poll_x, escrow_y, color="r", label="Escrow Cost")
ax2.plot(poll_x, lottery_y, color="g", label="Lottery Cost")
ax1.set_xlabel('Timestamp')
ax2.set_ylabel('ETH', color='black')
plt.ylim(top=0.75, bottom=0.20)
plt.legend()
plt.show()


# <br>
# <h2>PollEvent, EscrowEvent, & LotteryEvent Transaction Analysis</h2>

# In[428]:


# Setup our variables

poll_x = poll_event_vote_transaction_df.timestamp
poll_y = poll_event_vote_transaction_df.total_cost_eth
escrow_x = escrow_event_deposit_transaction_df.timestamp
escrow_y = escrow_event_deposit_transaction_df.total_cost_eth
lottery_x = lottery_event_deploy_input_increase_df.timestamp
lottery_y = lottery_event_deploy_input_increase_df.total_cost_eth
lottery_tickets = lottery_event_deploy_input_increase_df.ticket_count
poll_gas_price = poll_event_vote_transaction_df.gas_price_gwei
escrow_gas_price = escrow_event_deposit_transaction_df.gas_price_gwei
lottery_gas_price = lottery_event_deploy_input_increase_df.gas_price_gwei
poll_ether_price = poll_event_vote_transaction_df.eth_price_est
escrow_ether_price = escrow_event_deposit_transaction_df.eth_price_est
lottery_ether_price = lottery_event_deploy_input_increase_df.eth_price_est


# In[433]:


# LotteryEvent Deployment: Comparing cost of deployment with increasing ticket count

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(lottery_x, lottery_y, color="b", label="Lottery Cost")
ax2.plot(lottery_x, lottery_tickets, color="orange", label="Ticket Count")
ax1.plot(lottery_x, lottery_tickets, color="orange")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('Tickets', color='orange')
ax2.set_ylabel('ETH', color='blue')
plt.ylim(top=1, bottom=0.2)
plt.legend()
plt.show()

# LotteryEvent Deployment: Comparing cost of deployment with gas price
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(lottery_x, lottery_y, color="b", label="Lottery Cost")
ax2.plot(lottery_x, lottery_gas_price, color="purple", label="Gas Price")
ax1.plot(lottery_x, lottery_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='b')
plt.ylim(top=1, bottom=0.2)
plt.legend()
plt.show()


# In[430]:


# EscrowEvent Transaction: Comparing cost of depositing and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(escrow_x, escrow_y, color="r", label="Deposit Fee")
ax2.plot(escrow_x, escrow_gas_price, color="purple", label="Gas Price")
ax1.plot(escrow_x, escrow_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='r')
plt.ylim(top=0.02, bottom=0)
plt.legend()
plt.show()


# In[431]:


# PollEvent Transaction: Comparing cost of voting and gas price

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(poll_x, poll_y, color="y", label="Voting Fee")
ax2.plot(poll_x, poll_gas_price, color="purple", label="Gas Price")
ax1.plot(poll_x, poll_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='g')
plt.ylim(top=0.02, bottom=0)
plt.legend()
plt.show()


# <br>
# <h2>Ether and Gwei Correlation</h2>

# In[432]:


# Comparing cost of Ether with price of gas on Ethereum's network

# Time Period 1
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(poll_x, poll_ether_price, color="y", label="Ether price")
ax2.plot(poll_x, poll_gas_price, color="purple", label="Gas Price")
ax1.plot(poll_x, poll_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='g')
plt.ylim(top=2300, bottom=2260)
plt.legend()
plt.show()

# Time Period 2
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(escrow_x, escrow_ether_price, color="y", label="Ether price")
ax2.plot(escrow_x, escrow_gas_price, color="purple", label="Gas Price")
ax1.plot(escrow_x, escrow_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='g')
plt.ylim(top=2300, bottom=2260)
plt.legend()
plt.show()

# Time Period 3
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax2.plot(lottery_x, lottery_ether_price, color="y", label="Ether price")
ax2.plot(lottery_x, lottery_gas_price, color="purple", label="Gas Price")
ax1.plot(lottery_x, lottery_gas_price, color="purple")
ax1.set_xlabel('Timestamp')
ax1.set_ylabel('GWEI', color='purple')
ax2.set_ylabel('ETH', color='g')
plt.ylim(top=2350, bottom=2260)
plt.legend()
plt.show()


# In[ ]:





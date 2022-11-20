# TUM Blockchain Club - algo2gether
HackaTUM 22

# Inspiration
Decentralised Identity is one of the burning topics in today's and tomorrow's world. With new technologies based on Blockchain popping up every day, the wish for a decentralised identity is getting louder and louder. Being in full control of your data is an step to digital self-sovereignty.

Our decentralised platform will try to tackle this need.

“We should strive to make online identity better than paper-based identity across the board. Digitalization should not just be about making a process faster but should also retain important properties of the old process.” - Algorand

# What it does
Managing decentralized communities is a burden. Our tool algo2gether changes this by introducing a convenient role-based system, which is easily manageable for community managers, decentralized trading organizations, DAOs, local clubs and many more!

Our Tool brings the following functionality:
- Deploy a limited supply of soulbound community tokens to the Algorand Network
- Users can make an application for the community and request to get a non-transferable token (by opting in)
- The community leaders are able to see applications of all opted-in users and can accept, reject and revoke the digital membership (soon they will be even be able to assign more particular roles (master of coin, promoter, you name it)
- Connect to dAPP with your (MyAlgo Wallet)

Decentralised access and membership management for a community. The use case is not limited to specific university communities but applies to a large user-target group. Our web-based application utilises Algorand’s pure proof-of-stake (ppos) blockchain cryptocurrency protocol, which only requires minimal Hardware, has very low fees (less than 0.0001 Euro), is carbon neutral, and is Post-Quantum secure Blockchain- So you can create a fully decentralised platform.

# How we built it
There was 2 parallel paths:
1. Develop a user-friendly Frontend that connects the MyAlgo Wallet and allows users and admins to manage and request their membership and roles.
2. Develop a soulbound token that is non-transferable and deploy it on the Algorand Network

In the beginning we worked separately, but later, when it come to debugging and constructing the transactions, we had to use more than 2 eyes per monitor.

More coffein than the whole country of Italy, a rock-star team of 4 TUM engineers and contributors to the local Blockchain Community of Munich.
And also not to forget - Thanks for the amazing support to all the supervisors and AlgoNerds!

# Challenges we ran into
- Connecting to Frontend with Algorand Wallets
- Freezing an Asset right after transfering it in a grouped transaction.
- Some parts of Algorand are very new and there is some little bugs e.g. in Documentation.

# Accomplishments that we're proud of:
We deliver a working prototype that solves real-world problem. Next steps are clear and we have a common vision.
Particularly, we are proud, that we dove very deep into the internals of multiple open-source Algorand Projects (MyAlgoConnect, Indexer e.g.) and feel more than qualified to contribute to this ecosystem in the coming months. We feel like we touched many different places of Algorand .

# What we learned
Teamwork, Endurance - things don't develop linearly - keep pushing and go with the Flow!
aaaand details of different types of Algorand Standardized Assets.

# What's next for our tool
(12/1) Develop own SmartContracts with PyTeal, that expose different utility to different roles (e.g. access to treasury, voting etc.)
(12/22) Extensibility: Modular technical extensibility and hierarchy integration
(3/23) Finance: Integrating financial structures of Banks, VC and Hedge fonds
(6/23) Standardisation: Finalising a new standard for DAO Tokens. (#soulbound)
(12/23) Adoption: Expanding to a broader audience. 

# Built With
Algorand SDK, Indexer, PyTeal, deep dive in Algorand SDK, React/Next.JS, (liiitle bit NodeJs, MongoDB)

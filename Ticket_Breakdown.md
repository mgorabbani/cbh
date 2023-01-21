# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. 


We're working on a new feature which will 

generate reports 

for our client Facilities containing info on 
how many hours each Agent worked in a given quarter by summing up every Shift they worked.

Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom Agent ID field to Agent Table

**Description:** Add a column to the Agent table to store the custom id. This column should be nullable, and should be a string.

**Acceptance Criteria:**
- A new field called "custom_agent_id" is added to the Agents table in the database, and the field is nullable
- The column is nullable
- The column is a string

**Time Estimate:** 1 hour

**Implementation Details:**
- Add a migration to add the column to the Agent table
- Add "custom_agent_id" column to the Agent model

### Ticket 2:  Allow Facilities to set custom Agent IDs

**Description:** A new form field is added to the Facilities' view where they can set custom Agent IDs for each Agent they work with. The form should allow them to set the custom ID for Agents they haven't worked with before as well as update IDs for Agents they've worked with in the past.

**Acceptance Criteria:**
- The field is added to the Facilities' view
- The field is optional
- The field is a string

**Time Estimate:** 1 hour

**Implementation Details:**
- This can be done by creating a new form for the Facilities' view. This form should allow them to input the Agent's custom ID and then save it to the database as it is currently done for the other fields.

### Ticket 3: Update getShiftsByFacility function to return custom Agent IDs

**Description:** The getShiftsByFacility function is updated so that it returns the custom Agent ID for each Shift worked, in addition to the internal database id.

**Acceptance Criteria:**
- The function returns the "custom_agent_id" for each Shift worked
- the field can be empty string if the Agent has not been assigned a custom ID

**Time Estimate:** 1 hour

**Implementation Details:**
- The getShiftsByFacility function can be updated to return the "custom_agent_id" for each Shift worked, in addition to the internal database id.


### Ticket 4: create a new function getShiftsByAgent to return shifts grouped by agent

**Description:** The getShiftsByAgent function accepts ShiftsByFacility and returns the shifts grouped by agent with their total working hours on all shifts. 

**Acceptance Criteria:**
- The function returns the shifts grouped by agent with their total working hours on all shifts

**Time Estimate:** 4 hour

**Implementation Details:**
- The getShiftsByAgent function takes ShiftsByFacility as an argument and and use groupBy and reduce method to format the data and returns the shifts grouped by agent with their total working hours on all shifts.

### Ticket 5: Update generateReport function to pass either getShiftsByFacility or getShiftsByAgent to the report generator

**Description:** The generateReport function is updated so that it accepts either getShiftsByFacility or getShiftsByAgent's value as an argument. The report generator will then use the function to generate the report as it is currently done for the other getShiftsByFacility.

**Acceptance Criteria:**
- The function accepts either getShiftsByFacility or getShiftsByAgent as an argument
- everything else remains the same

**Time Estimate:** 2 hour

**Implementation Details:**
- The generateReport function will take additional argument getShiftsByAgent and use it to generate the report as it is currently done for the other getShiftsByFacility.

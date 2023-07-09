create table Student_Details (
	child_name VARCHAR(100),
	disability VARCHAR(100),
	severity INT,
	lemon_sharbat INT,
	maths INT,
	vocab INT,
	stamping_design INT,
	family_members_identification INT,
	quarter INT,
	year INT,
	region VARCHAR(100),
	school_name VARCHAR(100),
	teacher VARCHAR(100)
);


create unique index student_detail_idx on Student_Details (child_name, quarter);
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Ravi Kumar', 'ADHD', 1, 3, 3, 3, 2, 5, 1, 2022, 'Thane', 'Ryan International School', 'Priya Sharma');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Priya Sharma', 'Down syndrome', 0, 5, 4, 3, 5, 5, 1, 2022, 'Ahmednagar', 'Jamnabai Narsee School', 'Sneha Reddy');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Amit Patel', 'ADHD', 0, 4, 4, 2, 3, 2, 1, 2022, 'Nagpur', 'Bombay Scottish School', 'Neha Gupta');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Sneha Gupta', 'autism', 0, 1, 4, 4, 5, 4, 1, 2022, 'Thane', 'Bombay Scottish School', 'Rahul Verma');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Ravi Kumar', 'autism', 2, 2, 2, 1, 1, 5, 2, 2022, 'Amravati', 'Dhirubhai Ambani International School', 'Rahul Verma');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Priya Sharma', 'Down syndrome', 2, 3, 5, 2, 2, 5, 2, 2022, 'Raigad', 'Don Bosco High School', 'Sneha Reddy');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Amit Patel', 'ADHD', 2, 4, 5, 5, 5, 5, 2, 2022, 'Thane', 'Cathedral and John Connon School', 'Sneha Reddy');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Sneha Gupta', 'dyslexia', 1, 5, 4, 1, 1, 5, 2, 2022, 'Satara', 'Bombay Scottish School', 'Sneha Reddy');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Ravi Kumar', 'ADHD', 0, 2, 1, 5, 2, 4, 3, 2022, 'Palghar', 'Bombay Scottish School', 'Priya Sharma');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Priya Sharma', 'Down syndrome', 1, 5, 2, 2, 5, 2, 3, 2022, 'Ahmednagar', 'Hiranandani Foundation School', 'Rajesh Mehta');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Amit Patel', 'Down syndrome', 2, 2, 5, 1, 3, 5, 3, 2022, 'Dhule', 'Podar International School', 'Ravi Patel');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Sneha Gupta', 'ADHD', 1, 1, 2, 5, 1, 4, 3, 2022, 'Solapur', 'Arya Vidya Mandir', 'Pooja Chawla');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Ravi Kumar', 'cerebral palsy', 1, 2, 5, 1, 4, 3, 4, 2022, 'Aurangabad', 'Podar International School', 'Vikram Kumar');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Priya Sharma', 'Down syndrome', 0, 2, 4, 4, 4, 1, 4, 2022, 'Dhule', 'Podar International School', 'Sneha Reddy');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Amit Patel', 'Down syndrome', 0, 4, 5, 4, 4, 2, 4, 2022, 'Pune', 'St. Xavier''s School', 'Ananya Desai');
insert into Student_Details (child_name, disability, severity, lemon_sharbat, maths, vocab, stamping_design, family_members_identification, quarter, year, region, school_name, teacher) values ('Sneha Gupta', 'Down syndrome', 0, 5, 1, 3, 4, 5, 4, 2022, 'Navi Mumbai', 'Bombay Scottish School', 'Pooja Chawla');
commit;
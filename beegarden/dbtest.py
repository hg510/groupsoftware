import sqlite3
import math
CON = sqlite3.connect("db.sqlite3")
CUR = CON.cursor()
GOAL_WEIGHTS = {"placeholdergoal":5}

def calcPoints(goal,streak):
    return math.ceil(GOAL_WEIGHTS[goal] * math.log(streak+1.001))-1

def resetStreak(userID, goal):
    CUR.execute("UPDATE auth_user SET "+goal+"_streak = 0 WHERE id = "+str(userID))
    CON.commit()

def incGoal(userID, goal):
    currentTotal = CUR.execute("SELECT "+goal+"_total FROM auth_user WHERE id = "+str(userID)).fetchone()[0]
    currentStreak = CUR.execute("SELECT "+goal+"_streak FROM auth_user WHERE id = "+str(userID)).fetchone()[0]
    CUR.execute("UPDATE auth_user SET "+goal+"_streak = "+str(currentStreak+1)+" WHERE id = "+str(userID))
    CUR.execute("UPDATE auth_user SET "+goal+"_total = "+str(currentTotal+1)+" WHERE id = "+str(userID))
    currentPoints = CUR.execute("SELECT score FROM auth_user WHERE id = "+str(userID)).fetchone()[0]
    CUR.execute("UPDATE auth_user SET score = "+str(currentPoints+calcPoints(goal,currentStreak+1))+" WHERE id = "+str(userID))
    CON.commit()
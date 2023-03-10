/*
	Q[EC
*/

// JÊu(®)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// Q[p^XN
var<TaskManager_t> GameTasks = CreateTaskManager();

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

	// test
	var<Picture_t> pBgList =
	[
		P_Bg_PCº,
		P_Bg_Lº,
		P_Bg_³ºL,
		P_Bg_³ºM,
		P_Bg_³ºR,
		P_Bg_³ºó,
		P_Bg_ZÉ ,
		P_Bg_Zå,
		P_Bg_ºÖ,
		P_Bg_Ki,
		P_Bg_Kiã,
	];
	var<int> pBgPos = 0;

	// test
	var<Jikantai_e> jikantai = Jikantai_e_ASAHIRU;

	for (; ; )
	{
		ClearScreen();

		if (GetInput_Pause() == 1)
		{
			break;
		}

		if (GetMouseDown() == -1)
		{
			if (Screen_W / 2 > GetMouseX())
			{
				pBgPos++;
				pBgPos %= pBgList.length;
			}
			else
			{
				jikantai++;
				jikantai %= 4;
			}
		}

		Draw(pBgList[pBgPos][jikantai], Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);

//		Draw(P_Bg_PCº[Jikantai_e_YUUGATA], Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);

//		SetPrint(10, 30, 30);
//		SetPrint(10, Screen_H - 10, 30);
		SetPrint(10, Screen_H / 2, 30);
		SetFSize(20);
		SetColor("#ffffff");
		PrintLine(GetMouseDown() + ", " + GetMouseX() + ", " + GetMouseY());

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);
		yield 1;
	}
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);
}

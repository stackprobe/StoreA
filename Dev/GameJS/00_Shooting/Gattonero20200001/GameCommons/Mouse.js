/*
	�}�E�X�E��ʃ^�b�`����
*/

var<boolean> @@_Down = false;
var<double> @@_X = 0;
var<double> @@_Y = 0;

function <void> @@_ScreenPosToCanvasPos()
{
	var canvasRect = Canvas.getBoundingClientRect();

	@@_X -= canvasRect.left;
	@@_Y -= canvasRect.top;
	@@_X *= Screen_W / canvasRect.width;
	@@_Y *= Screen_H / canvasRect.height;
}

function <void> @@_TouchStart(<double> x, <double> y)
{
	@@_Down = true;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <void> @@_TouchMove(<double> x, <double> y)
{
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <void> @@_TouchEnd(<double> x, <double> y)
{
	@@_Down = false;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function <Action event> @@_GetEvTouch(<Action double double> touch)
{
	var<Action event> ret = function(event)
	{
		touch(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
	};

	return ret;
}

function <Action event> @@_GetEvMouse(<Action double double> touch)
{
	var<Action event> ret = function(event)
	{
		touch(event.x, event.y);
	};

	return ret;
}

function <void> @(UNQN)_INIT()
{
	if (window.ontouchstart === null)
	{
		CanvasBox.ontouchstart = @@_GetEvTouch(@@_TouchStart);
		CanvasBox.ontouchmove  = @@_GetEvTouch(@@_TouchMove);
		CanvasBox.ontouchend   = @@_GetEvTouch(@@_TouchEnd);
	}
	else
	{
		CanvasBox.onmousedown  = @@_GetEvMouse(@@_TouchStart);
		CanvasBox.onmousemove  = @@_GetEvMouse(@@_TouchMove);
		CanvasBox.onmouseup    = @@_GetEvMouse(@@_TouchEnd);
		CanvasBox.onmouseleave = @@_GetEvMouse(@@_TouchEnd);
	}
}

var<int> @@_DownCount;

function <void> @(UNQN)_EACH()
{
	if (1 <= @@_DownCount) // ? �O��_����
	{
		if (@@_Down)
		{
			@@_DownCount++;
		}
		else
		{
			@@_DownCount = -1;
		}
	}
	else // ? �O��_�������Ă��Ȃ��B
	{
		if (@@_Down)
		{
			@@_DownCount = 1;
		}
		else
		{
			@@_DownCount = 0;
		}
	}
}

// ������ �{�^���E�L�[������ 1 �}�E�X������ -1 �Ŕ��肷��B

/*
	�}�E�X�{�^���̉���(�X�N���[���E�^�b�`)��Ԃ𓾂�B
	�߂�l�F
		-1  == �������B(�O��͉���, ����͉������Ă��Ȃ�)
		0   == �����Ă��Ȃ��B(�O���������������Ă��Ȃ�)
		1   == �������B(�O��͉������Ă��Ȃ�, ����͉���)
		2�` == �����Ă���B�l�͉����������Ă��钷��(�t���[����)
*/
function <int> GetMouseDown()
{
	return @@_DownCount;
}

/*
	�}�E�X�{�^���̉���(�X�N���[���E�^�b�`)��Ԃ��N���A����B
*/
function <void> ClearMouseDown()
{
	@@_DownCount = 0;
}

/*
	�}�E�X�J�[�\���̈ʒu��Ԃ��BX-���W
*/
function <double> GetMouseX()
{
	return @@_X;
}

/*
	�}�E�X�J�[�\���̈ʒu��Ԃ��BY-���W
*/
function <double> GetMouseY()
{
	return @@_Y;
}

/*
	�摜
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);

var<Picture_t> P_Background = @@_Load(RESOURCE_�ς�����__Wall_png);
var<Picture_t> P_SlotBackground = @@_Load(RESOURCE_Picture__Game__IMG_20160000_003879_B_png);
//var<Picture_t> P_SlotBackground = @@_Load(RESOURCE_Picture__Game__IMG_20160000_003893_B_png);

var<Picture_t> P_Bar     = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Bar_png);
var<Picture_t> P_Bell    = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Bell_png);
var<Picture_t> P_BellC   = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__BellC_png);
var<Picture_t> P_BellP   = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__BellP_png);
var<Picture_t> P_Cherry  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Cherry_png);
var<Picture_t> P_CherryB = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__CherryB_png);
var<Picture_t> P_CherryG = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__CherryG_png);
var<Picture_t> P_Replay  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Replay_png);
var<Picture_t> P_ReplayP = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__ReplayP_png);
var<Picture_t> P_ReplayY = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__ReplayY_png);
var<Picture_t> P_Seven   = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Seven_png);
var<Picture_t> P_SevenB  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__SevenB_png);
var<Picture_t> P_SevenG  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__SevenG_png);
var<Picture_t> P_Seven2  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Seven2_png);
var<Picture_t> P_Seven2G = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Seven2G_png);
var<Picture_t> P_Seven2P = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Seven2P_png);
var<Picture_t> P_Suica   = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__Suica_png);
var<Picture_t> P_SuicaB  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__SuicaB_png);
var<Picture_t> P_SuicaG  = @@_Load(RESOURCE_�t��Ԃ̃t���[�f�ލH�[__SuicaG_png);

/*
	�X���b�g�̊G�����X�g
	���� == SLOT_PIC_NUM
	�{���̍�����
*/
var<Picture_t[]> P_SlotPics =
[
	P_Seven2,
	P_Seven,
	P_Bar,
	P_SuicaB,
	P_Suica,
	P_BellC,
	P_Bell,
	P_CherryG,
	P_Cherry,
];

function <void> @(UNQN)_INIT()
{
	if (P_SlotPics.length != SLOT_PIC_NUM)
	{
		error();
	}
}

var<Picture_t> P_DrumShadow = @@_Load(RESOURCE_Picture__Game__DrumShadow_png);

var<Picture_t> P_Lane01Button = @@_Load(RESOURCE_Picture__Game__Lane01Button_png);
var<Picture_t> P_Lane02Button = @@_Load(RESOURCE_Picture__Game__Lane02Button_png);
var<Picture_t> P_Lane03Button = @@_Load(RESOURCE_Picture__Game__Lane03Button_png);
var<Picture_t> P_LaneXXButton = @@_Load(RESOURCE_Picture__Game__LaneXXButton_png);

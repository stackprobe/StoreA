/*
	���y
*/

function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

// ��������e�퉹�y

// �v���t�B�N�X
// M_ ... ���y

//var<Sound_t> M_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Sound_t> M_Title   = @@_Load(RESOURCE_MusMus__MusMus_BGM_124_mp3);
var<Sound_t> M_Lane_01 = @@_Load(RESOURCE_MusMus__MusMus_BGM_141_mp3);
var<Sound_t> M_Lane_02 = @@_Load(RESOURCE_MusMus__MusMus_BGM_147_mp3);
var<Sound_t> M_Lane_03 = @@_Load(RESOURCE_MusMus__MusMus_BGM_156_mp3);
var<Sound_t> M_Lane_XX = @@_Load(RESOURCE_MusMus__MusMus_BGM_081_mp3);

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using Charlotte.Commons;
using Charlotte.Utilities;
using Charlotte.Tests;

namespace Charlotte
{
	class Program
	{
		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2);
		}

		private void Main2(ArgsReader ar)
		{
			if (ProcMain.DEBUG)
			{
				Main3();
			}
			else
			{
				Main4(ar);
			}
			SCommon.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			Main4(new ArgsReader(new string[] { @"C:\temp\riulril_action_game" }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			SCommon.Pause();
		}

		private void Main4(ArgsReader ar)
		{
			try
			{
				Main5(ar);
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				MessageBox.Show("" + ex, Path.GetFileNameWithoutExtension(ProcMain.SelfFile) + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private void Main5(ArgsReader ar)
		{
			// ---- 引数チェック

			string inputDir = SCommon.MakeFullPath(ar.NextArg());
			string outputDir = Path.Combine(SCommon.GetOutputDir(), "res");

			if (!Directory.Exists(inputDir))
				throw new Exception("no inputDir");

			// ---- 実行前チェック

			if (!File.Exists(Consts.FFMPEG_EXE))
				throw new Exception("no FFMPEG_EXE");

			// ----

			ProcMain.WriteLog("< " + inputDir);
			ProcMain.WriteLog("> " + outputDir);
			ProcMain.WriteLog("start");

			SCommon.CopyDir(inputDir, outputDir);

			string[] files = Directory.GetFiles(outputDir, "*", SearchOption.AllDirectories)
				.OrderBy(SCommon.Comp)
				.ToArray();

			foreach (string file in files)
				ConvertResFile(file);

			ProcMain.WriteLog("done!");
		}

		private void ConvertResFile(string file)
		{
			ProcMain.WriteLog("< " + file);

			string name = Path.GetFileNameWithoutExtension(file);
			string nameFmt = LiteFormat(name);

			if (
				nameFmt == "9" ||
				nameFmt == "99" ||
				nameFmt == "999"
				)
			{
				string fileNew = Path.Combine(SCommon.ToParentPath(file), ZPad(name, 4) + Path.GetExtension(file));

				if (ExistPath(fileNew))
					throw new Exception("出力ファイルの重複：" + fileNew);

				File.Move(file, fileNew);
				file = fileNew;
			}

			string ext = Path.GetExtension(file).ToLower();

			if (
				ext == ".bmp" ||
				ext == ".jpg" ||
				ext == ".jpeg"
				)
			{
				file = ConvertAnyToPng(file);
				ConvertPicture(file);
			}
			else if (ext == ".gif")
			{
				file = ConvertGifToPngs(file); // file == ディレクトリ

				foreach (string f in Directory.GetFiles(file))
				{
					ConvertPicture(f);
				}
			}
			else if (ext == ".png")
			{
				ConvertPicture(file);
			}
			else if (ext == ".ogg")
			{
				file = ConvertAnyToMP3(file);
			}

			ProcMain.WriteLog("> " + file);
		}

		private string ConvertAnyToPng(string inputFile)
		{
			string outputFile = SCommon.ChangeExt(inputFile, ".png");

			if (ExistPath(outputFile))
				throw new Exception("出力ファイルの重複：" + outputFile);

			Canvas.LoadFromFile(inputFile).Save(outputFile);
			SCommon.DeletePath(inputFile);
			return outputFile;
		}

		private string ConvertGifToPngs(string inputFile)
		{
			string outputDir = SCommon.ChangeExt(inputFile, "");

			if (ExistPath(outputDir))
				throw new Exception("出力ディレクトリの重複：" + outputDir);

			using (WorkingDir wd = new WorkingDir())
			{
				File.Copy(inputFile, wd.GetPath("input.gif"));
				SCommon.CreateDir(wd.GetPath("out"));

				SCommon.Batch(
					new string[]
					{
						Consts.FFMPEG_EXE + " -i input.gif -vcodec png out\\%%04d.png" 
					},
					wd.GetPath(".")
					);

				SCommon.CopyDir(wd.GetPath("out"), outputDir);
			}
			SCommon.DeletePath(inputFile);
			return outputDir;
		}

		private void ConvertPicture(string file)
		{
			Canvas canvas = Canvas.LoadFromFile(file);
			bool changed = false;

			if (canvas.W % 2 == 1)
			{
				Canvas dest = new Canvas(canvas.W + 1, canvas.H);

				dest.Fill(new I4Color(0, 0, 0, 0));
				dest.DrawImage(canvas, 0, 0, false);

				canvas = dest;
				changed = true;
			}
			if (canvas.H % 2 == 1)
			{
				Canvas dest = new Canvas(canvas.W, canvas.H + 1);

				dest.Fill(new I4Color(0, 0, 0, 0));
				dest.DrawImage(canvas, 0, 0, false);

				canvas = dest;
				changed = true;
			}

			if (changed)
				canvas.Save(file);
		}

		private string ConvertAnyToMP3(string inputFile)
		{
			string outputFile = SCommon.ChangeExt(inputFile, ".mp3");

			if (ExistPath(outputFile))
				throw new Exception("出力ファイルの重複：" + outputFile);

			using (WorkingDir wd = new WorkingDir())
			{
				string inputName = "input" + Path.GetExtension(inputFile);

				File.Copy(inputFile, wd.GetPath(inputName));

				SCommon.Batch(
					new string[]
					{
						Consts.FFMPEG_EXE + " -i " + inputName + " -ab 160k output.mp3"
					},
					wd.GetPath(".")
					);

				File.Copy(wd.GetPath("output.mp3"), outputFile);
			}
			SCommon.DeletePath(inputFile);
			return outputFile;
		}

		private static bool ExistPath(string path)
		{
			return Directory.Exists(path) || File.Exists(path);
		}

		private static string LiteFormat(string str)
		{
			return new string(str.Select(chr =>
			{
				if (SCommon.DECIMAL.Contains(chr))
					chr = '9';

				return chr;
			})
			.ToArray());
		}

		private static string ZPad(string str, int minlen)
		{
			while (str.Length < minlen)
				str = "0" + str;

			return str;
		}
	}
}

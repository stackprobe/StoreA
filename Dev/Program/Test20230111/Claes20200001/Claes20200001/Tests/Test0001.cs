using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			Console.WriteLine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop));
		}

		public void Test02()
		{
			List<object> list = new List<object>();

			for (int c = 0; c < 100; c++)
			{
				list.Add(Test02_a(2000000));
				list.Add(Test02_a(512000));
				list.Add(Test02_a(612000));

				// 追加で、細々としたもの
				for (int d = 0; d < 1000; d++)
					list.Add(Test02_a(1000));
			}

			SCommon.Pause();

			list = null;
			GC.Collect();

			//SCommon.Pause();
		}

		private byte[] Test02_a(int size)
		{
			byte[] data = new byte[size];

			for (int i = 0; i < size; i++)
				data[i] = SCommon.CRandom.GetByte();

			return data;
		}
	}
}

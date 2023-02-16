using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0005
	{
		public void Test01()
		{
			Console.WriteLine(Encoding.ASCII.GetString(SCommon.Base64.I.Decode("SGVsbG8sIEhhcHB5IFdvcmxkIQ")));
		}
	}
}

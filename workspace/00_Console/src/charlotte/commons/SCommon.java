package charlotte.commons;

/**
 * 共通機能・便利機能はできるだけこのクラスに集約する。
 * @author mt
 *
 */
public class SCommon {
	private static class S_AnonyAutoCloseable implements AutoCloseable {
		private Runnable _routine;
		
		public S_AnonyAutoCloseable(Runnable routine) {
			_routine = routine;
		}
		
		@Override
		public void close() throws Exception {
			if (_routine != null) {
				_routine.run();
				_routine = null;
			}
		}
	}
	
	public static AutoCloseable getAnonyAutoCloseable(Runnable routine) {
		return new S_AnonyAutoCloseable(routine);
	}
	
	// TODO
	// TODO
	// TODO
}
